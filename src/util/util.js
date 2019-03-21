class Util {
    constructor() {
        super()
    }
    getEventData(data, tag) {
        return data.currentTarget.dataset[tag];
    }
}
export  default Util