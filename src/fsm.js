class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;
        this.state = config.initial;
        this.history = null;
        this.historyRedo = null;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (state in this.config.states) {
            this.history = this.state;
            this.state = state;
        }else{
            throw Error();
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (event in this.config.states[this.state].transitions) {
            this.history = this.state;
            this.state = this.config.states[this.state].transitions[event];
            return this;
        }else{
            throw Error();
        }
    }
    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.history = this.state;
        this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event != null) {
            let arr = [];
            for (let i = 0; i < Object.keys(this.config.states).length; i++) {
                if (event in this.config.states[Object.keys(this.config.states)[i]].transitions) {
                    arr.push(Object.keys(this.config.states)[i]);
                }
            }
            return arr;
        }
        else return Object.keys(this.config.states);
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.history == null) 
        return false;
        this.historyRedo = this.state;
        this.state = this.history;
        this.history = null;
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.historyRedo == null) 
        return false;
        this.history = this.state;
        this.state = this.historyRedo;
        this.historyRedo = null;
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = null;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
