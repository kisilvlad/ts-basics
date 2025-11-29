var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// ----- API FETCH -----
export function loadPhoto(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("https://jsonplaceholder.typicode.com/photos/" + id);
        if (!response.ok) {
            throw new Error("HTTP error");
        }
        const data = yield response.json();
        if (typeof data.url !== "string" || typeof data.title !== "string") {
            throw new Error("Некоректний формат JSON");
        }
        console.log(data);
        return data;
    });
}
