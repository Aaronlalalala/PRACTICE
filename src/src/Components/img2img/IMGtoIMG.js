import React, { useState } from "react";
import "./IMG.css";
import CheckPoint from "../DropBox/CheckPoint";
import Prompt from "../Prompt/Prompt";
import NegativePrompt from "../Prompt/NegativePrompt";
import Generate from "../Button/Generate";
import IntergrateCLIP from '../Button/IntergrateCLIP';
import DeepBooru from '../Button/DeepBooru';
import JustResize from '../CheckBox/JustResize';
import CropAndResize from '../CheckBox/CropAndResize';
import ResizeAndFill from '../CheckBox/ResizeAndFill';
import LatentUpscale from '../CheckBox/LatentUpscale';
import SamplingMethod from "../DropBox/SamplingMethod";
import SamplingStep from "../Slider/SamplingStep";
import RestoreFaces from "../CheckBox/RestoreFaces";
import Tilling from "../CheckBox/Tilling";
import Width from "../Slider/Width";
import Height from "../Slider/Height";
import BatchCount from "../Slider/BatchCount";
import BatchSize from "../Slider/BatchSize";
import CFGScale from "../Slider/CFGScale";
import DenoisingStrength from "../Slider/DenoisingStength";
import Seed from "../Prompt/Seed";
import Script from "../DropBox/Script";
import axios from 'axios';
import {NavLink} from "react-router-dom";
function IMGtoIMG() {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [imgData, setImgData] = useState({
    init_images: "",
    prompt: "",
    negative_prompt: "",
    resize_mode: 0,
    denoising_strength: 0,
    inpaint_full_res: false,
    inpaint_full_res_padding: 0,
    inpainting_mask_invert: 0,
    initial_noise_multiplier: 0,
    styles: [],
    seed: 0,
    batch_size: 0,
    n_iter: 0,
    steps: 0,
    cfg_scale: 0,
    width: 0,
    height: 0,
    restore_faces: false,
    mask_blur: 0,
    tiling: false,
    eta: 0,
    sampler_index: "",
    alwayson_scripts: "",
    override_settings: {
      sd_model_checkpoint: ""
    }
  });

  // 將駝峰轉回蛇行
  function camelCaseToSnakeCase(input) {
    return input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
  }

  const handleGenerateClick = () => {
    const confirmed = window.confirm("確定要提交嗎?");
    if (confirmed) {
      // 轉圜成需求資料
      const requestData = {
        method: "POST",
        request: Object.keys(imgData).reduce((acc, key) => {
          acc[camelCaseToSnakeCase(key)] = imgData[key];
          return acc;
        }, {}),
        response: {
          message: "傳輸成功",
        },
      };
      jsonFunction(requestData);
    }
  };

  async function jsonFunction(imgToImgData) {
    try {
      await axios.post("/api/img2img/process", imgToImgData.request);
      alert("轉換成功");
    } catch (error) {
      console.log("Error sending data to backend:", error);
    }
  }

  return (
    <div className="IMGcontainer">
      <div style={{ width: "25%" }}>
        <CheckPoint />
      </div>
      <div className="NavStyle">
        <span>
          <NavLink to="/TXTtoIMG">
            <button>TxtPage</button>
          </NavLink>
          <NavLink to="/MainPage">
            <button>MainPage</button>
          </NavLink>
        </span>
      </div>
      <div className="PromptStyle">
        <Prompt />
        <NegativePrompt />
      </div>
      <div className="ButtonStyle">
        <IntergrateCLIP />
        <DeepBooru />
        <Generate onClick={handleGenerateClick} />
      </div>
      <div className="CheckBoxStyle">
        <JustResize />
        <CropAndResize />
        <ResizeAndFill />
        <LatentUpscale />
      </div>
      <div className="DropBoxStyle">
        <SamplingMethod />
      </div>
      <div className="CheckBoxStyle">
        <RestoreFaces />
        <Tilling />
      </div>
      <div className="SliderStyle">
        <SamplingStep />
        <Width />
        <Height />
        <BatchCount />
        <BatchSize />
        <CFGScale />
        <DenoisingStrength />
      </div>
      <div className="PromptStyle">
        <Seed />
      </div>
      <div className="DropBoxStyle">
        <Script />
      </div>
    </div>
  );
}

export default IMGtoIMG;
