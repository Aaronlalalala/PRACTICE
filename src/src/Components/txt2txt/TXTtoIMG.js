import React, { useState } from "react";
import "./TXT.css";
import Dice from "../Button/Dice";
import Revolve from "../Button/Revolve";
import Generate from "../Button/Generate";
import RestoreFaces from "../CheckBox/RestoreFaces";
import Tilling from "../CheckBox/Tilling";
import CheckPoint from "../DropBox/CheckPoint";
import SamplingMethod from "../DropBox/SamplingMethod";
import Styles from "../DropBox/Styles";
import NegativePrompt from "../Prompt/NegativePrompt";
import Prompt from "../Prompt/Prompt";
import Seed from "../Slider/Seed";
import BatchCount from "../Slider/BatchCount";
import BatchSize from "../Slider/BatchSize";
import CFGScale from "../Slider/CFGScale";
import SamplingStep from "../Slider/SamplingStep";
import Width from "../Slider/Width";
import { NavLink } from "react-router-dom";
import Height from "../Slider/Height";
import axios from "axios";
import Hires from "../CheckBox/Hires";
import Upscaler from "../ForHireFix/Upscaler";
import DenoisingStrength from "../ForHireFix/DenoisingStength";
import UpscaleBy from "../ForHireFix/UpscaleBy";
import HireSteps from "../ForHireFix/HireSteps";
import ResizeHeight from "../ForHireFix/ResizeHeight";
import ResizeWidth from "../ForHireFix/ResizeWidth";
// lazy 動態加載
function TxtPage() {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isHiresChecked, setIsHiresChecked] = useState(false);
  const [formData, setFormData] = useState({
    enable_hr: false,
    denoising_strength: 0,
    hr_scale: 2,
    hr_upscaler: "Latent",
    hr_second_pass_steps: 0,
    hr_resize_x: 0,
    hr_resize_y: 0,
    prompt: "A cat",
    styles: [],
    seed: -1,
    batch_size: 1,
    n_iter: 1,
    steps: 20,
    cfg_scale: 7,
    width: 512,
    height: 512,
    restore_faces: false,
    tiling: false,
    negative_prompt: "",
    eta: 0,
    override_settings: { 
      sd_model_checkpoint: "sd-v1-5-inpainting.ckpt [c6bbc15e32]" 
    },
    script_args: [],
    sampler_index: "Euler a",
    alwayson_scripts: {}
  });

  // 其他 state 和事件處理程序...

  const handleHiresCheckboxChange = (value) => {
    setIsHiresChecked(value);
  };

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
      await axios.post("http://localhost:8080/api/txt2img/process", TxtToImgData.request);
      alert("轉換成功");
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  }

  const handleFormDataChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    // 查看更新
    console.log(`Field ${fieldName} updated to:`, value);
  };

  function camelCaseToSnakeCase(input) {
    return input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
  }

  return (
    <div className="TXTcontanier">
      <div style={{ position: "absolute", left: "300px" }}>
        <CheckPoint value={formData.override_settings.sd_model_checkpoint} onChange={(value) => handleFormDataChange("override_settings.sd_model_checkpoint", value)} />
      </div>
      <div className="NavStyle">
        <span>
          <NavLink to="/ImgPage">
            <button>ImgPage</button>
          </NavLink>
        </span>
      </div>
      <div className="ButtonStyle">
        <div>
          <Dice />
        </div>
        <div>
          <Generate onClick={HandleGenerateClick} />
        </div>
        <div>
          <Revolve />
        </div>
      </div>
      <div className="PromptStyle">
        <div>
          <Prompt value={formData.prompt} onChange={(value) => handleFormDataChange("prompt", value)} />
        </div>
        <div>
          <NegativePrompt value={formData.negative_prompt} onChange={(value) => handleFormDataChange("negative_prompt", value)} />
        </div>
      </div>
      <div className="DropBoxStyle" style={{ position: "relative", left: "30%" }}>
        <SamplingMethod value={formData.sampler_index} onChange={(value) => handleFormDataChange("sampler_index", value)} />
      </div>
      <div className="SliderStyle">
        <SamplingStep value={formData.steps} onChange={(value) => handleFormDataChange("steps", value)} />
      </div>
      <div className="CheckBoxStyle">
        <div>
          <RestoreFaces value={formData.restore_faces} onChange={(value) => handleFormDataChange("restore_faces", value)} />
        </div>
        <div>
          <Tilling value={formData.tiling} onChange={(value) => handleFormDataChange("tiling", value)} />
        </div>
        <div>
        <Hires
          value={formData.enable_hr}
          onChange={(value) => {
         handleFormDataChange("enable_hr", value);
         handleHiresCheckboxChange(value); // 設置 isHiresChecked 的值
         }}
        />
      {isHiresChecked ? (
         <div>
         {/* 顯示子元件 */}
         <Upscaler
           value={formData.hr_upscaler}
           onChange={(value) => handleFormDataChange("hr_upscaler", value)}
         />
        <DenoisingStrength
           value={formData.denoising_strength}
           onChange={(value) => handleFormDataChange("denoising_strength", value)}
         />
        <UpscaleBy
           value={formData.hr_scale}
           onChange={(value) => handleFormDataChange("hr_scale", value)}
         />
        <HireSteps
           value={formData.hr_second_pass_steps}
           onChange={(value) => handleFormDataChange("hr_second_pass_steps", value)}
         />
        <ResizeHeight
           value={formData.hr_resize_x}
           onChange={(value) => handleFormDataChange("hr_resize_x", value)}
        />
        <ResizeWidth
           value={formData.hr_resize_y}
           onChange={(value) => handleFormDataChange("hr_resize_y", value)}
        />
       </div>
       ) : null}
        </div>
        <div>
          <Styles value={formData.styles} onChange={(value) => handleFormDataChange("styles", value)} />
        </div>
      </div>
      
      <div className="SliderStyle">
        <div>
          <Width value={formData.width} onChange={(value) => handleFormDataChange("width", value)} />
        </div>
        <div>
          <BatchCount value={formData.n_iter} onChange={(value) => handleFormDataChange("n_iter", value)} />
        </div>
        <div>
          <Height value={formData.height} onChange={(value) => handleFormDataChange("height", value)} />
        </div>
        <div>
          <BatchSize value={formData.batch_size} onChange={(value) => handleFormDataChange('batch_size', value)} />
        </div>
        <div>
          <CFGScale value={formData.cfg_scale} onChange={(value) => handleFormDataChange("cfg_scale", value)} />
        </div>
      </div>
      <div className="PromptStyle">
        <Seed value={formData.seed} onChange={(value) => handleFormDataChange("seed", value)} />
      </div>
    </div>
  );
}

export default TxtPage;
