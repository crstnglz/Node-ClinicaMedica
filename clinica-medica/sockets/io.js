let io;

const setIO = (ioInstance) => {
    io = ioInstance;
}

const getIO = () => {
    return io;
}

export { setIO, getIO }