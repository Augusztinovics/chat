const User = require('../models/User.js');

function onConnection(socket, io) {
    socket.on('identify', (data) => {
        try {
            User.find(data.user_id).then((u) => {
                u.remember_token = socket.id;
                u.save().then(() => {
                    u.groupIds().then(ids => {
                        ids.forEach(id => {
                            socket.join('group_' + id.group_id);
                        });
                        io.emit('user_join', u.id);
                    });
                });
            });
        } catch (error) {
            console.log(error);
        }
    });

    socket.on('group_message', (msg) => {
        //Need some datastructure in msg, now just dumy
        //expected datastructure maybe: 
        //msg = 
        //{
        // group_id: (group id to send),
        // from_id: (user id of the sender)
        // from: (sender name(maybe not need, will see))
        // msg: (text message)
        // img: (image data, if any)
        // reaction: (selected reaction)
        //}
        //Audio(video, maybe) call will go on different event
        io.to('group_' + msg.group_id).emit(msg);
    });



    socket.on('disconnect', () => {
        try {
            User.where([['remember_token', socket.id]], 'first').then(u => {
                if (u) {
                    u.remember_token = null;
                    u.save();
                    io.emit('user_left', u.id);
                }
            });
        } catch (error) {
            console.log(error);
        }
    });
};

module.exports = onConnection;