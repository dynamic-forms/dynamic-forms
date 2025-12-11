import { Pipe, PipeTransform } from '@angular/core';
import { Repository } from '../../../state/config/config.model';

interface CodeBase {
  library?: string;
  app?: string;
}

@Pipe({ name: 'appCodeUrl' })
export class CodeUrlPipe implements PipeTransform {
  transform(repo: Repository, codeBase?: CodeBase): string {
    const branchPath = this.getBranchPath(repo);
    if (codeBase?.library) {
      const libraryPath = this.getLibraryPath(repo, codeBase.library);
      return encodeURI(`${repo.url}/${branchPath}/${libraryPath}`);
    }
    if (codeBase?.app) {
      const appPath = this.getAppPath(repo, codeBase.app);
      return encodeURI(`${repo.url}/${branchPath}/${appPath}`);
    }
    return encodeURI(`${repo.url}/${branchPath}`);
  }

  private getBranchPath(repo: Repository): string {
    return repo.branchPath.replace('{{branch}}', repo.branch);
  }

  private getLibraryPath(repo: Repository, library: string): string {
    return repo.libraryPath.replace('{{library}}', library);
  }

  private getAppPath(repo: Repository, app: string): string {
    return repo.appPath.replace('{{app}}', app);
  }
}
