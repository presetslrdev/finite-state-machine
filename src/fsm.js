class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) throw Error("throws an exception if config isn\'t passed");
        this.config = config;
        this.state = config.initial;
        this.history = [];
        this.cache = [];
        this.triggers = 0;
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
        if (this.config.states[state]) {
            this.state = state;
            this.history.push(this.state);
        } else
            throw Error('changeState exception');
    }


    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        this.changeState(this.config.states[this.state].transitions[event]);
        this.triggers++;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
        this.history = [];
        this.cache = [];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let State = [];
        if (event) {
            for (let state in this.config.states) {
                if (this.config.states[state].transitions[event])
                    State.push(state);
            }
        } else {
            for (let state in this.config.states) {
                State.push(state);
            }
        }
        return State;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
         if(this.history.length === 0)
             return false;
         else{
             this.cache.push(this.state);
             this.state = !this.triggers ? this.config.initial : this.history.pop();
             return true;
         }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.cache.length === 0)
            return false;
        else{
            this.history.push(this.state);
            this.state = this.cache.pop();
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [];
        this.cache = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
