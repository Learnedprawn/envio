import assert from "assert";
import { 
  TestHelpers,
  MovieFactory_OwnershipTransferred
} from "generated";
const { MockDb, MovieFactory } = TestHelpers;

describe("MovieFactory contract OwnershipTransferred event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for MovieFactory contract OwnershipTransferred event
  const event = MovieFactory.OwnershipTransferred.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("MovieFactory_OwnershipTransferred is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await MovieFactory.OwnershipTransferred.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualMovieFactoryOwnershipTransferred = mockDbUpdated.entities.MovieFactory_OwnershipTransferred.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedMovieFactoryOwnershipTransferred: MovieFactory_OwnershipTransferred = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      previousOwner: event.params.previousOwner,
      newOwner: event.params.newOwner,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualMovieFactoryOwnershipTransferred, expectedMovieFactoryOwnershipTransferred, "Actual MovieFactoryOwnershipTransferred should be the same as the expectedMovieFactoryOwnershipTransferred");
  });
});
