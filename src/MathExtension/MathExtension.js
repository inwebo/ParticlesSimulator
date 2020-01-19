const MathExtension = () => {
    if (!Math.__proto__.radiansToDegrees) {
        /**
         * Converts from radians to degrees.
         * @param {number} radians
         * @returns {number}
         */
        Math.__proto__.radiansToDegrees = (radians) => {
            return radians * 180 / Math.PI;
        };
    }

    /**
     * Converts from degrees to radians.
     * @param {int} degrees
     * @returns {number}
     */
    if (!Math.__proto__.degreesToRadians) {
        Math.__proto__.degreesToRadians = (degrees) => {
            return degrees * Math.PI / 180;
        };
    }
};

export default MathExtension();