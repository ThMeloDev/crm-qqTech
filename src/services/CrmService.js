import axios from "axios";

const port= 5000
const url_base = `http://localhost:${port}`

class CrmService {

  async createCrm(data,token) {
    const response = await axios({
      url: `${url_base}/crm/create`,
      method: "POST",
      timeout: "5000",
      data:data,
      headers: {
        Accept: "multipart/form-data",
        Authorization: `bearer ${token}`
      },
    });
    return JSON.stringify(response.data);
  }

  async updateCrm(data,token) {
    const response = await axios({
      url: `${url_base}/crm/updateCrm`,
      method: "POST",
      timeout: "5000",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `bearer ${token}`,
      },
    });
    return JSON.stringify(response.data);
  }

  async rejectCrm(data,token) {
    const response = await axios({
      url: `${url_base}/crm/reject`,
      method: "POST",
      timeout: "5000",
      data:data,
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${token}`
      },
    });
    return JSON.stringify(response.data);
  }

  async approveCrm(data,token) {
    const response = await axios({
      url: `${url_base}/crm/approve`,
      method: "POST",
      timeout: "5000",
      data:data,
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${token}`
      },
    });
    return JSON.stringify(response.data);
  }

  async listRejectedCrm(matricula,token) {
    const response = await axios({
      url: `${url_base}/crm/rejectedCrm?matricula=${matricula}`,
      method: "GET",
      timeout: "5000",
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${token}`
      },
    });
    return JSON.stringify(response.data);
  }

  async listPendingCrm(matricula,token) {
    const response = await axios({
      url: `${url_base}/crm/pendingCrm?matricula=${matricula}`,
      method: "GET",
      timeout: "5000",
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${token}`
      },
    });
    return JSON.stringify(response.data);
  }

  async listApprovedCrm(matricula,token) {
    const response = await axios({
      url: `${url_base}/crm/approvedCrm?matricula=${matricula}`,
      method: "GET",
      timeout: "5000",
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${token}`
      },
    });
    return JSON.stringify(response.data);
  }

  async getCrm(id,versao,token){
    const response = await axios({
      url: `${url_base}/crm?id=${id}&versao=${versao}`,
      method: "GET",
      timeout: "5000",
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${token}`
      },
    })
    return JSON.stringify(response.data);
  }

  async maxVersion(id,token){
    const response = await axios({
      url: `${url_base}/crm/maxVersion?id=${id}`,
      method: "GET",
      timeout: "5000",
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${token}`
      },
    })
    return JSON.stringify(response.data);
  }

  async getAllCrms(id,token){
    const response = await axios({
      url: `${url_base}/crm/allCrm?id=${id}`,
      method: "GET",
      timeout: "5000",
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${token}`
      },
    })
    return JSON.stringify(response.data);
  }

}


const crmService = new CrmService();
export default crmService;
