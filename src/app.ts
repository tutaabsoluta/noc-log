import { Server } from "./presentation/server"


( async () => {
    await main()
})();

function main() {
    Server.start()
};

// JSON Server sirve para hacer prototipos de apis o pruebas