import React, { useEffect, useState } from 'react';
import { VscChromeClose } from "react-icons/vsc";
import { FileUploader } from "react-drag-drop-files";
import { modal } from 'react-modal-dom';
import ProgressBar from "@ramonak/react-progress-bar";
import Avatar from 'react-avatar';
import SuccessModal from '../SuccessModal';
import clipIcon from '../../assets/clip.svg';
import addMovie from '../../assets/mobile-plus.svg';
import liteflix from '../../assets/liteflix-mini.svg';
import styles from './AddMovieModal.module.css';

const fileTypes = ["JPG", "PNG", "GIF"];

const AddMovieModal = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("AGREGÁ UN ARCHIVO O ARRASTRALO Y SOLTALO AQUÍ");
  const [title, setTitle] = useState("");
  const [uploadDisabled, setUploadDisabled] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState({display: "flex"});
  const [showProgressBar, setShowProgressBar] = useState({display: "none"});
  const [progressAction, setProgressAction] = useState("CANCELAR");
  const [progressColor, setProgressColor] = useState("#64EEBC");
  const [progressMessage, setProgressMessage] = useState("CARGANDO...");
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      if (window.innerWidth < 1024) {
        setFileName("AGREGÁ UN ARCHIVO");
      } else {
        setFileName("AGREGÁ UN ARCHIVO O ARRASTRALO Y SOLTALO AQUÍ");
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleCloseModal(){
    modal.close();
  }

  function handleFile(file){
    setFile(file);
    if (title == ""){
      setFileName(file.name);
    } else {
      if (title.toLowerCase().includes("liteflix")) successConfig();
      else errorConfig();
    }
  }

  function handleTitle(title){
    setTitle(title);
    if (file && title != ""){
      if (title.toLowerCase().includes("liteflix")) successConfig();
      else errorConfig();
    }
  }

  async function errorConfig(){
    setShowUploadForm({display: "none"});
    setShowProgressBar({display: "block"});
    await new Promise(resolve => setTimeout(resolve, 2000));
    setElapsedTime(100);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setProgressAction("REINTENTAR");
    setProgressColor("#FF0000");
    setProgressMessage("¡ERROR! NO SE PUDO CARGAR LA PELÍCULA");
  }

  async function successConfig(){
    setShowUploadForm({display: "none"});
    setShowProgressBar({display: "block"});
    setProgressColor("#64EEBC");
    await new Promise(resolve => setTimeout(resolve, 2000));
    setElapsedTime(100);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setProgressAction("LISTO");
    setProgressColor("#64EEBC");
    setProgressMessage("100% CARGADO");
    setUploadDisabled(false);
  }

  async function resetProgressBar(){
    if(progressAction == "CANCELAR"){
      await new Promise(resolve => setTimeout(resolve, 3000));
      setFile(null);
      setShowUploadForm({display: "flex"});
      setShowProgressBar({display: "none"});
      setProgressAction("CANCELAR");
      setProgressColor("#64EEBC");
      setProgressMessage("CARGANDO...");
      setFileName("AGREGÁ UN ARCHIVO O ARRASTRALO Y SOLTALO AQUÍ");
      setElapsedTime(0);
      setUploadDisabled(true);
    }
    if(progressAction == "REINTENTAR"){
      setFile(null);
      setShowUploadForm({display: "flex"});
      setShowProgressBar({display: "none"});
      setProgressAction("CANCELAR");
      setProgressColor("#64EEBC");
      setProgressMessage("CARGANDO...");
      setFileName("AGREGÁ UN ARCHIVO O ARRASTRALO Y SOLTALO AQUÍ");
      setElapsedTime(0); 
      setUploadDisabled(true);
    }
  }

  function getBase64(file){
    return new Promise((resolve,reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  function saveMovie(){
    getBase64(file).then(base64 => {
      localStorage.setItem(title, base64);
    });
    modal.open(<SuccessModal title={title} />);
  }

  return (
    <div className={styles.addMovieModal}>

      <div className={styles.mobileHeader}>
        <img style={{visibility: "hidden"}} src={addMovie} alt="add-movie" />
        <img src={liteflix} alt="liteflix-logo" />
        <Avatar githubHandle="lopez96lau" size="40" round={true} />
      </div>

      <div className={styles.closeButton}><a onClick={handleCloseModal}><VscChromeClose /></a></div>

      <div className={styles.modalTitle}>AGREGAR PELÍCULA</div>

      <div className={styles.movieDndContainer} style={showUploadForm}>
        <FileUploader
          handleChange={handleFile.bind(this)}
          name="file"
          types={fileTypes}
          hoverTitle=" "
          disabled={title == ""}
          children={
            <div className={styles.movieDnd}>
              <img src={clipIcon} alt=""/>{fileName}
            </div>
          }
          />
      </div>

      <div className={styles.progress} style={showProgressBar}>
        {progressMessage}
        <div className={styles.progressBar}>
          <ProgressBar
            isLabelVisible={false}
            completed={elapsedTime}
            bgColor={progressColor}
            borderRadius="0"
            height="10px"
          />
        </div>
        <div className={styles.progressAction}>
          <a onClick={resetProgressBar}>{progressAction}</a>
        </div>
      </div>

      <div className={styles.movieTitle}>
        <input type="text" placeholder="TÍTULO" onChange={e => handleTitle(e.target.value)}></input>
      </div>

      <div className={styles.actions}>
        <button disabled={uploadDisabled} onClick={saveMovie}>SUBIR PELÍCULA</button>
        <button className={styles.closeModalBtn} onClick={handleCloseModal}>SALIR</button>
      </div>
    </div>
  );
}

export default AddMovieModal;