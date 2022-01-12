import React, { useEffect, useState } from 'react';
import { VscChromeClose } from "react-icons/vsc";
import { FileUploader } from "react-drag-drop-files";
import { modal } from 'react-modal-dom';
import ProgressBar from "@ramonak/react-progress-bar";
import clipIcon from '../../assets/clip.svg';
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

      //TODO Seguir aca
      if (windowSize.width < 1024) {
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
      saveMovie();
    }
  }

  function handleTitle(title){
    setTitle(title);
    if (file && title != "") saveMovie();
  }

  async function saveMovie(){
    setShowUploadForm({display: "none"});
    setShowProgressBar({display: "block"});
    await new Promise(resolve => setTimeout(resolve, 2000));
    progress();
  }

  function progress(){
    setElapsedTime(100);
  }

  return (
    <div className={styles.addMovieModal}>
      <div className={styles.closeButton}><a onClick={handleCloseModal}><VscChromeClose /></a></div>

      <div className={styles.modalTitle}>AGREGAR PELÍCULA</div>

      <div className={styles.movieDndContainer} style={showUploadForm}>
        <FileUploader
          handleChange={handleFile.bind(this)}
          name="file"
          types={fileTypes}
          hoverTitle=" "
          children={
            <div className={styles.movieDnd}>
              <img src={clipIcon} alt=""/>{fileName}
            </div>
          }
          />
      </div>

      <div className={styles.progress} style={showProgressBar}>
        {"CARGANDO..."}
        <div className={styles.progressBar}>
          <ProgressBar
            isLabelVisible={false}
            completed={elapsedTime}
            bgColor="#64EEBC"
            borderRadius="0"
            height="10px"
          />
        </div>
        <div className={styles.progressAction}>
          <a>CANCELAR</a>
        </div>
      </div>

      <div className={styles.movieTitle}>
        <input type="text" placeholder="TÍTULO" onChange={e => handleTitle(e.target.value)}></input>
      </div>

      <div className={styles.actions}>
        <button disabled={uploadDisabled} onClick={saveMovie} >SUBIR PELÍCULA</button>
      </div>
    </div>
  );
}

export default AddMovieModal;