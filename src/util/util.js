const Util =  {
    getEventData(data, tag) {
        return data.currentTarget.dataset[tag];
    }
}
export default Util