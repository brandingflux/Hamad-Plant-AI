import React, { Component } from "react";
import Header from "./components/Homepage/Header";
import Instructions from "./components/Homepage/Instructions";
import Blog from "./components/Homepage/Blog";
import Footer from "./components/Homepage/Footer";
import UploadPopup from "./components/Popup/UploadPopup";
import ResultPage from "./components/ResultPage/ResultPage";
import * as tf from '@tensorflow/tfjs';

class Homepage extends Component {

  state = {
    showTryNow: false,
    showPrediction: false,
    image: null,
    tfModel: null,
    labels: null,
    modelError: null,
    isLoading: true
  }

  async componentDidMount() {
    try {
      console.log('Loading labels...');
      const labelsResponse = await fetch('/models/plant_disease_tfjs/class_indices.json');
      if (!labelsResponse.ok) {
        throw new Error(`Failed to load labels (${labelsResponse.status}): ${labelsResponse.statusText}`);
      }
      const labelsText = await labelsResponse.text();
      console.log('Labels text:', labelsText.substring(0, 100) + '...'); // Log first 100 chars
      
      let labels;
      try {
        labels = JSON.parse(labelsText);
      } catch (e) {
        console.error('Failed to parse labels JSON:', e);
        throw new Error('Failed to parse labels file as JSON. See console for details.');
      }
      console.log('Labels loaded successfully:', Object.keys(labels).length, 'classes');

      console.log('Loading TensorFlow model...');
      const modelPath = '/models/plant_disease_tfjs/model.json';
      console.log('Model path:', modelPath);
      
      let tfModel;
      try {
        tfModel = await tf.loadLayersModel(modelPath);
        console.log('TensorFlow model loaded successfully');
      } catch (e) {
        console.error('Failed to load TensorFlow model:', e);
        throw new Error('Failed to load TensorFlow model. See console for details.');
      }

      this.setState({
        labels,
        tfModel,
        isLoading: false
      });
    } catch (error) {
      console.error('Error in componentDidMount:', error);
      this.setState({
        modelError: error.message,
        isLoading: false
      });
    }
  }

  tryNowClickHandler = () => {
    console.log('Try Now clicked');
    if (this.state.modelError) {
      alert('Error loading model. Please try refreshing the page.');
      return;
    }
    this.setState({
      showTryNow: true
    });
  }

  tryNowCloseHandler = () => {
    this.setState({
      showTryNow: false
    })
  }

  resultPageCloseHandler = () => {
    this.setState({
      showPrediction: false,
      image: null,
    })
  }

  tryAnotherClickHandler = () => {
    this.setState({
      showPrediction: false,
      image: null,
      showTryNow: true
    })
  }

  imageSelectHandler = async (image) => {

    const base64 = await new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function (error) {
        reject(error);
      };

    });

    this.setState({
      showTryNow: false,
      showPrediction: true,
      image: base64
    })

  }

  predictDisease = async () => {
    while (!this.state.tfModel) {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(true);
        }, 500)
      })
    }
    let img = document.getElementById('plant-photo')

    let offset = tf.scalar(255)
    let tensorImg = tf.browser.fromPixels(img).resizeNearestNeighbor([224, 224]).toFloat().expandDims();
    let tensorImg_scaled = tensorImg.div(offset)
    let prediction = await this.state.tfModel.predict(tensorImg_scaled).data();

    let predicted_class = tf.argMax(prediction)
    let class_idxs = Array.from(predicted_class.dataSync());

    const diseases = [];

    for (const class_idx of class_idxs) {
      const predictedDisease = this.state.labels[class_idx];
      let [name, disease] = predictedDisease.split('___');
      name = name.replaceAll('_', ' ');
      disease = disease ? disease.replaceAll('_', ' ') : 'Healthy';
      diseases.push({
        name,
        disease,
        // Use a default image since the Azure blob storage is not accessible
        image: '/models/plant_disease_tfjs/sample.jpg',
        cureURL: disease === 'Healthy' ? 
          encodeURI(`https://www.google.com/search?q=How to keep ${name} plants healthy`) :
          encodeURI(`https://www.google.com/search?q=How to cure ${disease} in ${name}`)
      })
    }

    return diseases;
  }

  render() {

    if (this.state.showTryNow) {
      return (
        <UploadPopup onClose={this.tryNowCloseHandler}
          onCapture={this.imageSelectHandler} />
      )
    }

    if (this.state.showPrediction) {
      return (
        <ResultPage image={this.state.image}
          getDiseases={this.predictDisease}
          onTryAnotherClick={this.tryAnotherClickHandler}
          onClose={this.resultPageCloseHandler} />
      )
    }

    return (
      <>
        <Header 
          onTryNowClick={this.tryNowClickHandler}
          modelError={this.state.modelError}
          isLoading={this.state.isLoading}
        />
        <Instructions id="instructions" />
        <Blog id="blog" />
        <Footer />

      </>
    );
  }

};

export default Homepage;
