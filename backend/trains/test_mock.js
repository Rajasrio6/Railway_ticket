const { searchTrains } = require('./controller');

const req = {
    query: {
        from: "Chennai",
        to: "Madurai"
    }
};

const res = {
    status: (code) => ({
        json: (data) => console.log(JSON.stringify(data, null, 2))
    })
};

searchTrains(req, res);
