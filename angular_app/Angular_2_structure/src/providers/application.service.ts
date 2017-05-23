export class Application {
    static setInitialRun(initial) {
        window.localStorage["initialRun"] = (initial ? "true" : "false");
    }

    static isInitialRun() {
        var value = window.localStorage["initialRun"] || "true";
        return value == "true";
    }
}
