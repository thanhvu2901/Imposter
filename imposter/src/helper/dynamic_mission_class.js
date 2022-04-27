class DynamicMissionClass {
    constructor (classes, className, scene, x, y) {
        return new classes[className](scene, x, y);
    }
}
export default DynamicMissionClass
// create dynamic class base on name