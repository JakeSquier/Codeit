import axios from 'axios'

const API_URL = '/api/projects'

//Create new project
const createProject = async (projectData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, projectData, config)

    return response.data
}

//Update project
const updateProject = async (projectData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(API_URL + projectData.id, projectData, config)

    return response.data
}

//Delete project
const deleteProject = async (projectId, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + projectId, config)

    return response.data
}

//Get user projects
const getUserProjects = async (projectId, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + 'user', config)

    return response.data
}

//Get user project
const getUserProject = async (projectId, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL+'private/'+projectId, config)

    return response.data
}

//Get public project
const getPublicProject = async (projectId, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + projectId)

    return response.data
}

const projectService = {
    createProject,
    updateProject,
    deleteProject,
    getUserProjects,
    getUserProject,
    getPublicProject
}

export default projectService