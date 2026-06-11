const transform = (response) => {
    return {
        id: response.id,
        name: response.name,
        email: response.email,
        createdAt: response.created_at,
    };
}

module.exports = { transform };