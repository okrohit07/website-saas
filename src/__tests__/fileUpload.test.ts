import { PrismaClient } from "@prisma/client";
import { createMocks, RequestMethod } from "node-mocks-http";
import handler from "@/app/api/upload/route";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

// Helper function to create a mocked Next.js request and response
function mockRequestResponse(method: RequestMethod, body: any) {
  const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
    method,
    body,
  });
  req.headers["content-type"] = "application/json";
  return { req, res };
}

describe("File Upload API", () => {
  beforeAll(async () => {
    // Set up any necessary database connections or test data before running tests
    await prisma.$connect();
  });

  afterAll(async () => {
    // Clean up after all tests are finished
    await prisma.$disconnect();
  });

  it("should upload a file and save to the database", async () => {
    const fileData = {
      name: "test-file.jpg",
      fileType: "image/jpeg",
      size: 1024,
      url: "https://example.com/test-file.jpg",
      userId: "user_2hy2SjgRsh7StiqerbNygINMgtI",
    };

    const { req, res } = mockRequestResponse("POST", fileData);

    await handler(req, res);

    const response = res._getJSONData();

    expect(res.statusCode).toBe(201);
    expect(response.name).toBe(fileData.name);
    expect(response.fileType).toBe(fileData.fileType);
    expect(response.size).toBe(fileData.size);
    expect(response.url).toBe(fileData.url);
    expect(response.userId).toBe(fileData.userId);

    // Optionally, you can perform additional assertions based on your business logic
    // For example, check if the file is stored in the database correctly

    const savedFile = await prisma.file.findUnique({
      where: { id: response.id }, // Assuming 'id' is the primary key of your 'file' table
    });

    expect(savedFile).toBeTruthy();
    expect(savedFile?.name).toBe(fileData.name);
    expect(savedFile?.fileType).toBe(fileData.fileType);
    expect(savedFile?.size).toBe(fileData.size);
    expect(savedFile?.url).toBe(fileData.url);
    expect(savedFile?.userId).toBe(fileData.userId);
  });

  it("should return 405 Method Not Allowed for GET request", async () => {
    const { req, res } = mockRequestResponse("GET", null);

    await handler(req, res);

    expect(res.statusCode).toBe(405);
    expect(res._getJSONData()).toEqual({ error: "Method not allowed" });
  });

  it("should return 500 error when file save fails", async () => {
    const invalidFileData = {
      // Provide invalid data to intentionally fail the save operation
    };

    const { req, res } = mockRequestResponse("POST", invalidFileData);

    await handler(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({
      error: "Error saving file to database",
    });
  });

  // Add more test cases as per your specific requirements and edge cases
});
