import axios from "axios";

const fetchCategories = ({setState}) => {
    axios.get('https://funpoint-app.herokuapp.com/android/categories')
    .then(({data}) => setState(data));
};

const fetchAllEvents = ({setState}) => {
    axios.get('https://funpoint-app.herokuapp.com/android')
    .then(({data}) => setState(data));
};

const fetchEvent = ({id, setState, token}) => {
    let authToken;
    if (token === null) {
        authToken = '';
    } else {
        authToken = `Bearer_${token}`;
    }
    
    axios.get(`https://funpoint-app.herokuapp.com/android/event/${id}`, {
        headers: {
            "Authorization": authToken,
        },
    })
    .then(({data}) => setState(data));
};

const fetchAddedEvents = ({token, setState}) => {
    axios.get('https://funpoint-app.herokuapp.com/user/get_added_events', {
        headers: {
            "Authorization": `Bearer_${token}`,
        },
    }).then(({data}) => setState(data));
};

const fetchAddedCategories = ({token, setState}) => {
    axios.get('https://funpoint-app.herokuapp.com/user/get_added_categories', {
        headers: {
            "Authorization": `Bearer_${token}`,
        },
    }).then(({data}) => setState(data));
};

const fetchFavourite = ({token, setState}) => {
    axios.get('https://funpoint-app.herokuapp.com/user/get_favourite', {
        headers: {
            "Authorization": `Bearer_${token}`,
        },
    }).then(({data}) => setState(data));
};

const fetchAdminEvents = ({token, setState}) => {
    axios.get('https://funpoint-app.herokuapp.com/admin/events', {
        headers: {
            "Authorization": `Bearer_${token}`,
        },
    }).then(({data}) => setState(data));
};

const fetchAdminCategories = ({token, setState}) => {
    axios.get('https://funpoint-app.herokuapp.com/admin/categories', {
        headers: {
            "Authorization": `Bearer_${token}`,
        },
    }).then(({data}) => setState(data));
};





const fetchCategoryEvents = ({categoryId, setState}) => {
    axios.post('https://funpoint-app.herokuapp.com/android/category', {categoryId})
    .then(({data}) => setState(data));
};

const addEvent = ({event, setStatus, token}) => {
    fetch('https://funpoint-app.herokuapp.com/add/event', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer_${token}`,
        },
        body: JSON.stringify(event),
    }).then(({status}) => setStatus(status));
};

const addCategory = ({category, setStatus, token}) => {
    fetch('https://funpoint-app.herokuapp.com/add/category', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer_${token}`,
        },
        body: JSON.stringify(category),
    }).then(({status}) => setStatus(status));
};

const addEventToFavourite = ({token, idEvent, setState}) => {
    fetch('https://funpoint-app.herokuapp.com/user/add_to_favourite', {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer_${token}`,
        },
        body: JSON.stringify(idEvent),
    }).then(data => data.ok && data.json())
    .then(response => setState(response));
};

const moderateEvent = ({token, adminAnswer}) => {
    fetch('https://funpoint-app.herokuapp.com/admin/moderate_event', {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer_${token}`,
        },
        body: JSON.stringify(adminAnswer),
    });
};

const moderateCategory = ({token, adminAnswer}) => {
    fetch('https://funpoint-app.herokuapp.com/admin/moderate_category', {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer_${token}`,
        },
        body: JSON.stringify(adminAnswer),
    });
};

const reworkEvent = ({token, reworkedEvent}) => {
    fetch('https://funpoint-app.herokuapp.com/user/rework_event', {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer_${token}`,
        },
        body: JSON.stringify(reworkedEvent),
    });
};

const reworkCategory = ({token, reworkedCategory}) => {
    fetch('https://funpoint-app.herokuapp.com/user/rework_category', {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer_${token}`,
        },
        body: JSON.stringify(reworkedCategory),
    });
};





const removeEventFromFavourite = ({token, idEvent, setState}) => {
    fetch('https://funpoint-app.herokuapp.com/user/delete_from_fav', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer_${token}`,
        },
        body: JSON.stringify(idEvent),
    }).then(data => data.ok && data.json())
    .then(response => setState(response));
};

const eventsApi = {
    fetchCategories,
    fetchAllEvents,
    fetchCategoryEvents,
    addEvent,
    addCategory,
    fetchEvent,
    fetchAddedEvents,
    fetchAddedCategories,
    fetchFavourite,
    addEventToFavourite,
    removeEventFromFavourite,
    fetchAdminEvents,
    fetchAdminCategories,
    moderateEvent,
    moderateCategory,
    reworkEvent,
    reworkCategory,
};

export default eventsApi;