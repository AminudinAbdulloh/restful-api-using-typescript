import supertest from "supertest";
import { ContactTest, UserTest } from "./test-util";
import { logger } from "../src/application/logging";
import { web } from "../src/application/web";

describe('POST /api/contacts', () => {

    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should create new contact', async () => {
        const response = await supertest(web)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "Aminudin",
                last_name: "Abdulloh",
                email: "amin@example.com",
                phone: "08123456789"
            });

        logger.info(response.body);
        console.log(response.body);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.first_name).toBe("Aminudin");
        expect(response.body.data.last_name).toBe("Abdulloh");
        expect(response.body.data.email).toBe("amin@example.com");
        expect(response.body.data.phone).toBe("08123456789");
    });

    it('should reject create new contact if data is invalid', async () => {
        const response = await supertest(web)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "",
                last_name: "",
                email: "amin",
                phone: "081299999999999999999999999999993456789"
            });

        logger.info(response.body);
        console.log(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
});

describe("GET /api/contacts/:contactId", () => {

    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    });

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should be able get contact', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")
            
        logger.info(response.body);
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.first_name).toBe(contact.first_name);
        expect(response.body.data.last_name).toBe(contact.last_name);
        expect(response.body.data.email).toBe(contact.email);
        expect(response.body.data.phone).toBe(contact.phone);
    });

    it('should reject get contact if contact is not found', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id + 1}`)
            .set("X-API-TOKEN", "test")
            
        logger.info(response.body);
        console.log(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
});

describe("PUT /api/contacts/:contactId", () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    });

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("should be abel to update contact", async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "Amin",
                last_name: "Abdul",
                email: "amin@example.com",
                phone: "0822123456"
            });

        logger.info(response.body);
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.first_name).toBe("Amin");
        expect(response.body.data.last_name).toBe("Abdul");
        expect(response.body.data.email).toBe("amin@example.com");
        expect(response.body.data.phone).toBe("0822123456");
    });

    it("should reject update contact if request is invalid", async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "",
                last_name: "",
                email: "",
                phone: "0822123456"
            });

        logger.info(response.body);
        console.log(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
});

describe("DELETE /api/contacts/:contactId", () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    });

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should be able to remove contact', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test");

        logger.info(response.body);
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("OK");
    });

    it('should reject remove contact if contact is not found', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id + 1}`)
            .set("X-API-TOKEN", "test");

        logger.info(response.body);
        console.log(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
});

describe('GET api/contacts', () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    });

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should be able to search contact', async () => {
        const response = await supertest(web)
            .get("/api/contacts")
            .set("X-API-TOKEN", "test");

        logger.info(response.body);
        console.log(response.body);
        console.log(response.status);
        console.log(response.body.data.length);
        console.log(response.body.paging.current_page);
        console.log(response.body.paging.total_page);
        console.log(response.body.paging.size);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    });

    it('should be able to search name', async () => {
        const response = await supertest(web)
            .get("/api/contacts")
            .query({
                name: "es"
            })
            .set("X-API-TOKEN", "test");

        logger.info(response.body);
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    });

    it('should be able to search email', async () => {
        const response = await supertest(web)
            .get("/api/contacts")
            .query({
                email: "example"
            })
            .set("X-API-TOKEN", "test");

        logger.info(response.body);
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    });

    it('should be able to search phone', async () => {
        const response = await supertest(web)
            .get("/api/contacts")
            .query({
                phone: "081"
            })
            .set("X-API-TOKEN", "test");

        logger.info(response.body);
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    });

    it('should be able to search contact no result', async () => {
        const response = await supertest(web)
            .get("/api/contacts")
            .query({
                name: "salah"
            })
            .set("X-API-TOKEN", "test");

        logger.info(response.body);
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(0);
        expect(response.body.paging.size).toBe(10);
    });

    it('should be able to search contact with paging', async () => {
        const response = await supertest(web)
            .get("/api/contacts")
            .query({
                page: 2,
                size: 1
            })
            .set("X-API-TOKEN", "test");

        logger.info(response.body);
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0);
        expect(response.body.paging.current_page).toBe(2);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(1);
    });
});