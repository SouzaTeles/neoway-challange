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

export async function listDocuments(filters = {}) {
  const response = await api.get("/documents", { params: filters })
  return response.data
}

export async function toggleBlocklist(id, blocklisted) {
  const response = await api.patch(`/documents/${id}`, { blocklisted })
  return response.data
}

export async function deleteDocument(id) {
  const response = await api.delete(`/documents/${id}`)
  return response.data
}