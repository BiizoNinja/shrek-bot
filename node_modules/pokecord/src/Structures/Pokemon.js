const Constants = require("../Constants/Constants");

class Pokemon {

    /**
     * The pokemon constructor
     * @param {object} [data] Raw data received from the api
     */
    constructor(data = {}) {
        this._patch(data);
    }

    /**
     * Patch raw data
     * @param {object} data Raw data to patch
     * @private
     * @returns {void}
     */
    _patch(data) {
        if (!data || !Object.keys(data).length) throw new Error(`The ${this.constructor.name} class may not be instantiated without raw data!`);

        /**
         * Pokemon id
         * @type {number}
         */
        this.id = data.id || null;

        /**
         * Pokemon name
         * @type {string}
         */
        this.name = data.name ? this._toTitleCase(data.name) : null;

        /**
         * Base experience
         * @type {number}
         */
        this.baseExperience = data.base_experience || null;

        /**
         * Height
         * @type {number}
         */
        this.height = data.height || null;

        /**
         * Weight
         * @type {number}
         */
        this.weight = data.weight || null;

        // raw data
        Object.defineProperty(this, "raw", { value: data });
    }

    /**
     * Types of this pokemon
     * @type {object[]}
     */
    get types() {
        return this.raw && this.raw.types || [null];
    }

    /**
     * Species of this pokemon
     * @type {object}
     */
    get species() {
        return this.raw && this.raw.species || null;
    }

    /**
     * Game indices of this pokemon
     * @type {object[]}
     */
    get indices() {
        return this.raw && this.raw.game_indices || [];
    }

    /**
     * Pokemon stats
     * @type {object[]}
     */
    get stats() {
        return this.raw && this.raw.stats || [];
    }

    /**
     * High quality image for this pokemon
     * @type {string}
     */
    get imageURL() {
        if (!this.id || typeof this.id !== "number") return null;
        if (this.id < Constants.IMAGE_MIN || this.id > Constants.IMAGE_MAX) return null;
        return Constants.BASE_IMAGE_URL(this.id);
    }

    /**
     * Sptites
     * @type {object}
     */
    get sprites() {
        return this.raw && this.raw.sprites || null;
    }

    /**
     * Abilities of this pokemon
     * @type {object[]}
     */
    get abilities() {
        return this.raw && this.raw.abilities || [];
    }

    /**
     * Location area encounters of this pokemon
     * @type {string}
     */
    get location() {
        return this.raw && this.raw.location_area_encounters || null;
    }

    /**
     * Is this pokemon default?
     * @type {boolean}
     */
    get isDefault() {
        return !!(this.raw && this.raw.is_default);
    }

    _toTitleCase(str) {
        if (typeof str !== "string") return null;
        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

}

module.exports = Pokemon;