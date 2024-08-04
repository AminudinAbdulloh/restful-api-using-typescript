import supertest from "supertest";
import { AddressTest, ContactTest, UserTest } from "./test-util";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe('POST "/api/contacts/:contactId/addresses', () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    });

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should be able to create address', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "jalan jalan",
                city: "Manchester City",
                province: "Provinsi Apa",
                country: "Negara apa",
                postal_code: "23123"
            });

            logger.info(response.body);
            console.log(response.body);
            expect(response.status).toBe(200);
            expect(response.body.data.street).toBe("jalan jalan");
            expect(response.body.data.city).toBe("Manchester City");
            expect(response.body.data.province).toBe("Provinsi Apa");
            expect(response.body.data.country).toBe("Negara apa");
            expect(response.body.data.postal_code).toBe("23123");
    });

    it('should be able to create address if invalid', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "",
                city: "",
                province: "",
                country: "",
                postal_code: ""
            });

            logger.info(response.body);
            console.log(response.body);
            expect(response.status).toBe(400);
            expect(response.body.errors).toBeDefined();
    });
});

describe("GET /api/contacts/:contactId/addresses/:addressId", () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
        await AddressTest.create();
    });

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should be able to get address', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
            
        logger.info(response.body);
        console.log(response.body.errors);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.street).toBe(address.street);
        expect(response.body.data.city).toBe(address.city);
        expect(response.body.data.province).toBe(address.province);
        expect(response.body.data.country).toBe(address.country);
        expect(response.body.data.postal_code).toBe(address.postal_code);
    });
});

describe("PUT /api/contacts/:contactId/addresses/:addressId", () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
        await AddressTest.create();
    });

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should be able to update address', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        console.log(address)

        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "jalan jalan",
                city: "Manchester City",
                province: "Provinsi Apa",
                country: "Negara apa",
                postal_code: "23123"
            });

            logger.info(response.body);
            console.log(response.body);
            expect(response.status).toBe(200);
            expect(response.body.data.id).toBe(address.id);
            expect(response.body.data.street).toBe("jalan jalan");
            expect(response.body.data.city).toBe("Manchester City");
            expect(response.body.data.province).toBe("Provinsi Apa");
            expect(response.body.data.country).toBe("Negara apa");
            expect(response.body.data.postal_code).toBe("23123");
    });

    it('should reject to update address if invalid', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        console.log(address)

        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "jalan jalan",
                city: "Manchester City",
                province: "Provinsi Apa",
                country: "",
                postal_code: ""
            });

            logger.info(response.body);
            console.log(response.body);
            expect(response.status).toBe(400);
            expect(response.body.errors).toBeDefined();
    });

    it('should reject to update address if address is not found', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        console.log(address)

        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "jalan jalan",
                city: "Manchester City",
                province: "Provinsi Apa",
                country: "negara apa",
                postal_code: "12345"
            });

            logger.info(response.body);
            console.log(response.body);
            expect(response.status).toBe(404);
            expect(response.body.errors).toBeDefined();
    });

    it('should reject to update address if contact is not found', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        console.log(address)

        const response = await supertest(web)
            .put(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "jalan jalan",
                city: "Manchester City",
                province: "Provinsi Apa",
                country: "negara apa",
                postal_code: "12345"
            });

            logger.info(response.body);
            console.log(response.body);
            expect(response.status).toBe(404);
            expect(response.body.errors).toBeDefined();
    });
});

describe("DELETE /api/contacts/:contactId/addresses/:addressId", () => {

    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
        await AddressTest.create();
    });

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should be able to remove address', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
            
        logger.info(response.body);
        console.log(response.body.errors);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("OK");
    });

    it('should reject remove address if address is not found', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id}/addresses/${address.id+ 1}`)
            .set("X-API-TOKEN", "test")
            
        logger.info(response.body);
        console.log(response.body.errors);
        expect(response.status).toBe(404);
    });

    it('should reject remove address if contact is not found', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
            
        logger.info(response.body);
        console.log(response.body.errors);
        expect(response.status).toBe(404);
    });
});

describe("GET /api/contacts/:contactId/addresses", () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
        await AddressTest.create();
    });

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should be able to list addresses', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test")
            
        logger.info(response.body);
        console.log(response.body.errors);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);

    });

    it('should reject list addresses if contact is not found', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web)
            .get(`/api/contacts/${contact.id + 1}/addresses`)
            .set("X-API-TOKEN", "test")
            
        logger.info(response.body);
        console.log(response.body.errors);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
});