const User = require('../models/User.js');
const ChatMessage = require('../models/ChatMessage.js');

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
        ChatMessage.create(msg);
        socket.to('group_' + msg.group_id).emit('group_message', msg);
    });

    socket.on('update', (data) => {
        io.emit('user_update', data);
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