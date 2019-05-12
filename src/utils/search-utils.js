

let toSearchFormat = v => (typeof v === "string" ? v : v.toString()).toLowerCase().trim();

export {
    toSearchFormat
}