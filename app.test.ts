import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "src";
import diContainer from "../src/DiContainer/container"
import userMemoryRepository from "src/users/repository/memoryUserRepository";
import UserService from "src/users/services";
import { buildApp } from "src/app";
describe("app", () => {

    describe("GET /users/allUsers", () => {
        it("deberia devolver una lista de usuarios", async () => {
            // Arrange
            diContainer.register("UserRepository", userMemoryRepository)
            diContainer.register("userService", UserService, ["UserRepository"]);
            const app = buildApp()
            const usersExprecteds = [{
                id: 1,
                username: "manuelito",
                email: "manueltito@gmail.com"
            },
            {
                id: 2,
                username: "juanito",
                email: "juanito@gmail.com",
            }]
            // Act
            const response = await request(app).get("/users/allUsers");
            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                expect.arrayContaining(usersExprecteds)
            );
        });
    });

    describe("GET /users/:id", () => {
        it("deberia devolver un objeto de usuario o undefined", async () => {
            // Arrange
            diContainer.register("UserRepository", userMemoryRepository);
            diContainer.register("userService", UserService, ["UserRepository"]);

            const app = buildApp();
            const id = "1";

            const userExpected = {
                id: 1,
                username: "manuelito",
                email: "manueltito@gmail.com"
            }
            // Act
            const response = await request(app).get(`/users/${id}`);
            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                expect.objectContaining(userExpected)
            );
        });

    });

    describe("POST /register", () => {
        it("deberia registrar al usuario", async () => {
            // Arrange
            diContainer.register("UserRepository", userMemoryRepository);
            diContainer.register("userService", UserService, ["UserRepository"]);
            const app = buildApp();
            const newUser = {
                username: "example",
                password: "pass22234",
                email: "example@gmail.com"
            };
            const idExpected = 45;
            // Act
            const response = await request(app).post("/users/register")

            // Assert
            expect(response.status).toBe(201);
            expect(response.body).toEqual(
                expect.objectContaining({
                    id: idExpected,
                    username: newUser.username,
                    email: newUser.email
                })
            );
        });
        it("Si faltan campos deberia devolver un mensaje de error", async () => {
            // Arrange
            diContainer.register("UserRepository", userMemoryRepository);
            diContainer.register("userService", UserService, ["UserRepository"]);
            const app = buildApp();
            const newUser = {
                username: "nuevoario",
                password: "passwo123"
            };
            const message = { message: "error, ingrese todos los campos" }
            // Act
            const response = await request(app).post("/users/register")

            // Assert
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual(message);

        });

    });
});
