import React, { useState } from "react";
import "./TXT.css";
import Dice from "../Button/Dice";
import Revolve from "../Button/Revolve";
import Generate from "../Button/Generate"; 
import Hires from "../CheckBox/Hires";
import RestoreFaces from "../CheckBox/RestoreFaces";
import Tilling from "../CheckBox/Tilling";
import CheckPoint from "../DropBox/CheckPoint";
import SamplingMethod from "../DropBox/SamplingMethod";
import Styles from "../DropBox/Styles";
import Script from "../DropBox/Script";
import NegativePrompt from "../Prompt/NegativePrompt";
import Prompt from "../Prompt/Prompt";
import Seed from "../Prompt/Seed";
import BatchCount from "../Slider/BatchCount";
import BatchSize from "../Slider/BatchSize"; 
import CFGScale from "../Slider/CFGScale";
import SamplingStep from "../Slider/SamplingStep";
import Width from "../Slider/Width";
import { NavLink } from "react-router-dom";
import Height from "../Slider/Height";
import axios from "axios";

function TXTtoIMG() {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [formData, setFormData] = useState({
    prompt: "",
    negative_prompt: "",
    denoising_strength: 0,
    styles: [],
    seed: 0,
    batch_size: 0,
    n_iter: 0,
    steps: 0,
    cfg_scale: 0,
    width: 0,
    height: 0,
    restore_faces: false,
    tiling: false,
    eta: 0,
    sampler_index: "",
    alwayson_scripts: "",
  });
  function camelCaseToSnakeCase(input) {
    return input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
  }


  const HandleGenerateClick = () => {
    const confirmed = window.confirm("確定要提交嗎？");
    if (confirmed) {
      const TxtToImgData = {
        method: "POST",
        request: Object.keys(formData).reduce((acc, key) => {
          acc[camelCaseToSnakeCase(key)] = formData[key];
          return acc;
        }, {}),
        response: {
          message: "請求成功",
        },
      };
      Jsonfunction(TxtToImgData);
    }
  };

  async function Jsonfunction(TxtToImgData) {
    try {
      await axios.post("/api/txt2img/process", TxtToImgData.request);
      alert("轉換成功");
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <div className="TXTcontanier">
      <div style={{ width: "25%" }}>
        <CheckPoint />
      </div>
      <div className="NavStyle">
        <span>
          <NavLink to="/IMGtoIMG">
            <button>ImgPage</button>
          </NavLink>
          <NavLink to="/MainPage">
            <button>MainPage</button>
          </NavLink>
        </span>
      </div>
      <div>
        <Generate onClick={HandleGenerateClick} />{/* 點擊按鈕提交 */}
      </div>
      <div className="PromptStyle">
        <div>
          <Prompt />
        </div>
        <div>
          <NegativePrompt />
        </div>
      </div>
      <div className="DropBoxStyle">
        <SamplingMethod />
      </div>
      <div className="SliderStyle">
        <SamplingStep />
      </div>
      <div className="CheckBoxStyle">
        <div>
          <RestoreFaces />
        </div>
        <div>
          <Tilling />
        </div>
        <div>
          <Hires />
        </div>
        <div>
          <Styles />
        </div>
      </div>
      <div className="SliderStyle">
        <div>
          <Width />
        </div>
        <div>
          <BatchCount />
        </div>
        <div>
          <Height />
        </div>
        <div>
          <BatchSize />
        </div>
        <div>
          <CFGScale />
        </div>
      </div>
      <div className="PromptStyle">
        <Seed />
      </div>
      <div className="ButtonStyle">
        <div>
          <Dice />
        </div>
        <div>
          <Revolve />
        </div>
      </div>
      <div className="CheckBoxStyle">
        <Script />
      </div>
    </div>
  );
}

export default TXTtoIMG;

