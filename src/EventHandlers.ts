/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
    MovieFactory,
    MovieFactory_OwnershipTransferred,
    MovieFactory_MovieTokenCreated,
    Movie,
    Movie_WinnerSelected,
    Movie_Launch,
    Movie_Transfer,
    Movie_Staked,
    Movie_TokenMinted,
} from "generated";

MovieFactory.OwnershipTransferred.handler(async ({ event, context }) => {
    const entity: MovieFactory_OwnershipTransferred = {
        id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
        previousOwner: event.params.previousOwner,
        newOwner: event.params.newOwner,
    };

    context.MovieFactory_OwnershipTransferred.set(entity);
});

MovieFactory.MovieTokenCreated.handler(async ({ event, context }) => {
    context.log.info(`helllloo`);
    const entity: MovieFactory_MovieTokenCreated = {
        id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
        tokenAddress: event.params.tokenAddress,
        owner: event.params.owner,
        name: event.params.name,
        symbol: event.params.symbol,
        totalAmount: event.params.totalAmount,
        endTime: event.params.endTime,
        numOfTotalAllotments: event.params.numOfTotalAllotments,
    };
    context.MovieFactory_MovieTokenCreated.set(entity);
});

MovieFactory.MovieTokenCreated.contractRegister(({ event, context }) => {
    context.addMovie(event.params.tokenAddress);
    context.log.info(`Registered new Movie at ${event.params.tokenAddress}`);
});

Movie.WinnerSelected.handler(async ({ event, context }) => {
    context.log.info(`Movie winner selected at ${event.srcAddress}`);
    const entity: Movie_WinnerSelected = {
        id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
        winner: event.params.winner,
        movieAddress: event.params.movieAddress,
    };

    context.Movie_WinnerSelected.set(entity);
});

Movie.Launch.handler(async ({ event, context }) => {
    context.log.info(`Launch event occured: ${event.params.newUrl}`);
    const entity: Movie_Launch = {
        id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
        newUrl: event.params.newUrl,
    };

    context.Movie_Launch.set(entity);
});

Movie.Transfer.handler(async ({ event, context }) => {
    context.log.info(`Transfer event occured: ${event.params.from}`);
    const entity: Movie_Transfer = {
        id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
        from: event.params.from,
        to: event.params.to,
        value: event.params.value,
    };

    context.Movie_Transfer.set(entity);
});

Movie.Staked.handler(async ({ event, context }) => {
    context.log.info(`Staked event occured: ${event.params.staker}`);
    const entity: Movie_Staked = {
        id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
        tokenName: event.params.tokenName,
        staker: event.params.staker,
        numOfAllotments: event.params.numOfAllotments,
        movie: event.params.movie,
    };

    context.Movie_Staked.set(entity);
});
Movie.TokenMinted.handler(async ({ event, context }) => {
    context.log.info(`TokenMinted event occured: ${event.params.winner}`);
    const entity: Movie_TokenMinted = {
        id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
        winner: event.params.winner,
        amount: event.params.amount,
    };

    context.Movie_TokenMinted.set(entity);
});
