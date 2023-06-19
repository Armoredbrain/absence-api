module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    resetMocks: true,
    collectCoverageFrom: ["**/src/controllers/*.ts", "**/src/managers/**/*.ts", "**/src/middlewares/*.ts"],
};
