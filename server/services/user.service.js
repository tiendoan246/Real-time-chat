var images = [
    "/files/assets/images/avatar-3.jpg",
    "/files/assets/images/task/task-u1.jpg",
    "/files/assets/images/avatar-1.jpg",
    "/files/assets/images/avatar-2.jpg",
    "/files/assets/images/avatar-5.jpg"
];
const maxIndex = images.length - 1;
const minIndex = 0;

var userService = {
    getUser: function() {
        const index = Math.floor(Math.random() * (maxIndex - minIndex + 1) + minIndex)
        const image = images[index];
        const name = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        return {
            status: "online",
            username: name,
            img: image
        };
    }
};

module.exports = userService;