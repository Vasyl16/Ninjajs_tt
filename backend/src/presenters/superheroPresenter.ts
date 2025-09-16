import { config } from '../configs/config';
import {
  ISuperHero,
  ISuperheroListQuery,
  ISuperheroListResponse,
} from '../interface/superhero.interface';

class SuperheroPresenter {
  toPublicResponse(entity: ISuperHero): ISuperHero {
    const { s3Endpoint } = config.aws;

    const {
      _id,
      nickname,
      realName,
      superpowers,
      catchPhrase,
      images,
      originDescription,
    } = entity;

    const formatImages = images?.map((image) => {
      const fullImagePath = `${s3Endpoint}/${image.path}`;

      return { _id: image._id, title: image.title, path: fullImagePath };
    });

    return {
      _id,
      nickname,
      realName,
      superpowers,
      catchPhrase,
      images: formatImages,
      originDescription,
    };
  }

  toListResponse(
    entities: ISuperHero[],
    total: number,
    query: ISuperheroListQuery
  ): ISuperheroListResponse {
    return {
      page: query.page || 1,
      total,
      entities: entities.map((entity) => this.toPublicResponse(entity)),
      query,
    };
  }
}

export const superheroPresenter = new SuperheroPresenter();
