//components
import CrmInput from "../components/CrmInput";
import FileUpload from "../components/FileUpload";
import File from "../components/File";

//assets
import Vector from "../assets/vector.svg";
import Search from "../assets/search.png";
import Version from "../assets/version_control.png";

//css
import "../css/Crm.css";

//hooks
import React, { useEffect, useState } from "react";
import System from "../components/System";
import Sector from "../components/Sector";
import setorService from "../services/SetorService";
import sistemaService from "../services/SistemaService";
import { useNavigate } from "react-router-dom";
import crmService from "../services/CrmService";

function Crm({ status, title }) {
  const [crm, setCrm] = useState();
  const [nome, setNome] = useState('');
  const [necessidade, setNecessidade] = useState('');
  const [impacto, setImpacto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [justificativa, setJustificativa] = useState('');
  const [alternativas, setAlternativas] = useState('');
  const [dataLegal, setDataLegal] = useState(null);
  const [comportamentoOffline, setComportamentoOffline] = useState('');
  const [setores, setSetores] = useState([]);
  const [setoresEnvolvidos, setSetoresEnvolvidos] = useState(["TI"]);
  const [sistemas, setSistemas] = useState([]);
  const [sistemasEnvolvidos, setSistemasEnvolvidos] = useState([]);
  const [arquivos, setArquivos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusCrm, setStatusCrm] = useState();
  const [colaboradorCriador, setColaboradorCriador] = useState();
  const navigate = useNavigate();
  //Pegar params da url
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const versao = urlParams.get('versao')


  const handleCreateCrm = async (evt) => {
    setIsLoading(true);
    evt.preventDefault();

    let data = {
      nome: nome,
      necessidade: necessidade,
      impacto: impacto,
      descricao: descricao,
      objetivo: objetivo,
      justificativa: justificativa,
      alternativas: alternativas,
      dataLegal: dataLegal,
      comportamentoOffline: comportamentoOffline,
      colaboradorCriador: colaboradorCriador,
      setoresEnvolvidos: setoresEnvolvidos,
      sistemasEnvolvidos: sistemasEnvolvidos,
      documentos: arquivos,
    };
    const crmResponse = JSON.parse(
      await crmService.createCrm(data, localStorage.getItem("@Auth:token"))
    );
    setIsLoading(false);
    if (crmResponse.message === "CADASTRADA") {
      alert("Crm cadastrada com sucesso");
      navigate("/home");
    } else {
      alert("Erro ao cadastrar CRM, por favor entre em contato com o suporte");
    }
  };

  const handleReturnPage = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  const handleLegalDate = () => {
    const div_date = document.getElementById("date");
    const div_radio = document.getElementsByClassName("radioDataLegal")[0];
    if (
      document.querySelector('input[name="legalData"]:checked').value === "yes"
    ) {
      div_date.style.display = "flex";
      div_radio.style.marginBottom = "0";
    } else {
      div_date.style.display = "none";
      div_radio.style.marginBottom = "3rem";
    }
  };

  const getSectors = async (token) => {
    try {
      const response = await setorService.listSectors(token);
      setSetores(response);
    } catch (error) {
      return error;
    }
  };

  const getSystems = async (token) => {
    try {
      const response = await sistemaService.listSystems(token);
      setSistemas(response);
    } catch (error) {
      return error;
    }
  };

  const getCrm = async (CrmId,CrmVersao,token) => {
    try {
      const response = JSON.parse(await crmService.getCrm(CrmId,CrmVersao,token));
      setCrm(response[0]);
      setAlternativas(crm.alternativas)
      setComportamentoOffline(crm.comportamentoOffline)
      setColaboradorCriador(crm.colaboradorCriador);
      setDataLegal(crm.dataLegal)
      setDescricao(crm.descricao)
      setImpacto(crm.impacto)
      setJustificativa(crm.justificativa)
      setNecessidade(crm.necessidade)
      setNome(crm.nome)
      setObjetivo(crm.objetivo)
      setSetoresEnvolvidos(crm.setoresEnvolvidos)
      setSistemasEnvolvidos(crm.sistemasEnvolvidos)
    } catch (error) {
      return error;
    }
  };

  const getStatusCrm = () => {
    console.log(setoresEnvolvidos)
    const sectorsWithPendingFlag = setoresEnvolvidos.filter(checkPendingFlag)
    const sectorsWithRejectedFlag = setoresEnvolvidos.filter(checkRejectedFlag) 
    const sectorsWithApprovedFlag = setoresEnvolvidos.filter(checkApprovedFlag)
    if(sectorsWithPendingFlag.length > 1){
      setStatusCrm('pending')
    }
  }

  function checkPendingFlag(setorEnvolvido){
    return setorEnvolvido.flag == 'pendente'
  }

  function checkRejectedFlag(setorEnvolvido){
    return setorEnvolvido.flag == 'rejeitado'
  }

  function checkApprovedFlag(setorEnvolvido){
    return setorEnvolvido.flag == 'aprovado'
  }

  useEffect(() => {
   setIsLoading(true)
   getSectors(localStorage.getItem("@Auth:token"));
   getSystems(localStorage.getItem("@Auth:token"));
   getCrm(id,versao,localStorage.getItem("@Auth:token"));
   getStatusCrm()
   setIsLoading(false)
  }, [crm]);

  return (
    <div>
      {isLoading 
        ? (<h1>Teste</h1>)
        :  (
          <main className="background_crm">
      <div className={`statusCrm ${statusCrm}`}></div>
      <form className="form_crm">
        <div className="header_crm">
          <button className="header_img">
            <img src={Vector} alt="Icone de voltar" />
          </button>
          <h1 className="title-crm">{title}</h1>
          <button className={`version_background ${statusCrm}`}>
            <img src={Version} alt="Icone de versionamento" />
          </button>
        </div>

        
        <CrmInput
          type="text"
          label="A necessidade de *"
          name="necessidade"
          onChange={(e) => setNecessidade(e.target.value)}
          value={necessidade}
          readOnly={true}
        />

        <div className="sectorsDiv">
          <span className="sectorDivTitle">setores envolvidos</span>
          <div className="sectors">
            {setores.map((setor, i) => {
              return (
                <Sector
                  key={i}
                  sector={setor.nome}
                  setoresEnvolvidos={setoresEnvolvidos}
                  setSetoresEnvolvidos={setSetoresEnvolvidos}
                />
              );
            })}
          </div>
        </div>

        <CrmInput
          type="text"
          label="Cujo impacto é *"
          name="impacto"
          onChange={(e) => setImpacto(e.target.value)}
        />
        <CrmInput
          type="text"
          label="Descrição *"
          name="descricao"
          onChange={(e) => setDescricao(e.target.value)}
        />
        <CrmInput
          type="text"
          label="Objetivo *"
          name="objetivo"
          onChange={(e) => setObjetivo(e.target.value)}
        />
        <CrmInput
          type="text"
          label="Justificativa *"
          name="justificativa"
          onChange={(e) => setJustificativa(e.target.value)}
        />
        <CrmInput
          type="text"
          label="Alternativas"
          name="alternativa"
          onChange={(e) => setAlternativas(e.target.value)}
        />
        <span className="label_date">Possui data Legal?</span>
        <div className="radioDataLegal">
          <div>
            <input
              type="radio"
              name="legalData"
              value="yes"
              id="yes"
              onChange={handleLegalDate}
            />
            <label htmlFor="yes">Sim</label>
          </div>
          <div>
            <input
              type="radio"
              name="legalData"
              value="no"
              id="no"
              onChange={handleLegalDate}
            />
            <label htmlFor="no">Não</label>
          </div>
        </div>
        <div id="date">
          <CrmInput
            type="date"
            name="dataLegal"
            onChange={(e) => setDataLegal(e.target.value)}
          />
        </div>
        <div className="sectorsDiv">
          <span className="sectorDivTitle">sistemas envolvidos</span>
          <div className="sectors">
            {sistemas.map((sistema, i) => {
              return (
                <System
                  key={i}
                  system={sistema.nome}
                  sistemasEnvolvidos={sistemasEnvolvidos}
                  setSistemasEnvolvidos={setSistemasEnvolvidos}
                />
              );
            })}
          </div>
        </div>

        <CrmInput
          type="text"
          label="Comportamento Offline"
          name="comportamentoOffline"
          onChange={(e) => setComportamentoOffline(e.target.value)}
        />

        <div className="filesDiv">
          <span className="filesDiv_title">Arquivos</span>
          <div className="files">
            {arquivos.map((file, i) => {
              return <File key={i} file={file} />;
            })}
          </div>
          <div className="filesAdd" value="adicionar arquivos">
            <span>ADICIONAR ARQUIVOS</span>
            <FileUpload
              files={arquivos}
              setFiles={setArquivos}
              className="file_upload"
            />
          </div>
        </div>

        <input
          className="submit"
          type="submit"
          onClick={handleCreateCrm}
          value="enviar crm"
        />
      </form>
    </main>
        )}
    </div>
    
  );
}

export default Crm;
