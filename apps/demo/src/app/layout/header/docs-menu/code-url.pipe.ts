import { Pipe, PipeTransform } from '@angular/core';
import { Repository } from '../../../state/config/config.model';


@Pipe({ name: 'appCodeUrl' })
export class CodeUrlPipe implements PipeTransform {
  transform(repo: Repository, library: string): string {
    const path = this.getPath(repo, library);
    return encodeURI(`${repo.url}/${path}`);
  }

  private getPath(repo: Repository, library: string): string {
    return repo.libraryPath
      .replace('{{library}}', library)
      .replace('{{branch}}', repo.branch);
  }
}
