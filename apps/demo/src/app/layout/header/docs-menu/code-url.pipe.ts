import { Pipe, PipeTransform } from '@angular/core';
import { Repository } from '../../../state/config/config.model';

@Pipe({ name: 'appCodeUrl' })
export class CodeUrlPipe implements PipeTransform {
  transform(repo: Repository, library: string): string {
    const query = this.getQuery(repo, library);
    return `${repo.url}?${query}`;
  }

  private getQuery(repo: Repository, library: string): string {
    return repo.libraryQuery
      .replace('{{library}}', library)
      .replace('{{branch}}', repo.branch);
  }
}
