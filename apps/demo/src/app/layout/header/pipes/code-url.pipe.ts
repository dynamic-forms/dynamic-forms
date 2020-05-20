import { Pipe, PipeTransform } from '@angular/core';
import { Repository } from '../../../state/config/config.model';


@Pipe({ name: 'appCodeUrl' })
export class CodeUrlPipe implements PipeTransform {
  transform(repo: Repository, library?: string): string {
    const branchPath = this.getBranchPath(repo);
    if (library) {
      const libraryPath = this.getLibraryPath(repo, library);
      return encodeURI(`${repo.url}/${branchPath}/${libraryPath}`);
    }
    return encodeURI(`${repo.url}/${branchPath}`);
  }

  private getBranchPath(repo: Repository): string {
    return repo.branchPath.replace('{{branch}}', repo.branch);
  }

  private getLibraryPath(repo: Repository, library: string): string {
    return repo.libraryPath.replace('{{library}}', library);
  }
}
