const Logger={
    info:(message,data={})=>{
        console.log(`[INFO] ${message}`,data)
    },
    error:(message,error ={})=>{
        console.error(`[ERROR]${message} `,error)
    },
    warn:(message, data = {}) => {
    console.warn(`[WARN] ${message}`, data);
  },

  debug: (message, data = {}) => {
    console.debug(`[DEBUG] ${message}`, data);
  }
}

export default Logger