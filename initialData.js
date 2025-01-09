const baseData = {
    users: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Doe" },
    ],
    settings: { theme: "light", notifications: true },
};

// Almacenamos los datos actuales en una variable separada.
let currentData = { ...baseData };