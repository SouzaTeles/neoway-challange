import api from "./http"

export async function saveDocument(documentType, documentNumber, blocklisted = false) {
  const payload = {
    type: documentType,
    document: documentNumber,
    blocklisted: blocklisted
  }

  const response = await api.post("/documents", payload)
  return response.data
}
