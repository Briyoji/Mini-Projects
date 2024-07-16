import data from "./themes.json"

setMode("light")

export let themes = [{"name": "light", "bgcolor": "#FFFFFF"}, {"name": "dark", "bgcolor": "#004A31"}, {"name": "black", "bgcolor": "#000000"}]

export function setMode (theme = "light") {
    for (let [key,value] of Object.entries(data)) {
        document.documentElement.style.setProperty(key, String(value[theme]));
    }
}