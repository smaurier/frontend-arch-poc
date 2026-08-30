// Reference declarative Jenkins pipeline. Mirrors GitHub Actions CI.
// Not actively executed here. Kept as a portability guarantee.

pipeline {
  agent {
    docker {
      image 'node:22'
      args '-u root:root'
    }
  }

  environment {
    PNPM_HOME = "${env.WORKSPACE}/.pnpm-store"
    npm_config_store_dir = "${env.WORKSPACE}/.pnpm-store"
  }

  stages {
    stage('setup') {
      steps {
        sh 'corepack enable'
        sh 'corepack prepare pnpm@10.28.2 --activate'
        sh 'pnpm install --frozen-lockfile'
      }
    }

    stage('quality') {
      parallel {
        stage('lint') {
          steps { sh 'pnpm turbo run lint' }
        }
        stage('typecheck') {
          steps { sh 'pnpm turbo run typecheck' }
        }
        stage('test') {
          steps { sh 'pnpm turbo run test' }
        }
      }
    }

    stage('build') {
      steps { sh 'pnpm turbo run build' }
      post {
        success {
          archiveArtifacts artifacts: 'apps/shell/dist/**, apps/shell/storybook-static/**', fingerprint: false
        }
      }
    }

    stage('integration') {
      parallel {
        stage('e2e') {
          steps {
            sh 'pnpm --filter @frontend-arch-poc/shell exec playwright install --with-deps chromium'
            sh 'pnpm --filter @frontend-arch-poc/shell e2e'
          }
          post {
            failure {
              archiveArtifacts artifacts: 'apps/shell/playwright-report/**', allowEmptyArchive: true
            }
          }
        }
        stage('size-limit') {
          steps { sh 'pnpm exec size-limit' }
        }
        stage('lighthouse') {
          steps {
            sh 'pnpm --filter @frontend-arch-poc/shell exec playwright install --with-deps chromium'
            sh 'pnpm lhci'
          }
        }
      }
    }

    stage('security') {
      parallel {
        stage('secrets-scan') {
          steps {
            echo 'Recommend gitleaks. Install and run: gitleaks detect --source . --no-git'
          }
        }
        stage('deps-audit') {
          steps { sh 'pnpm audit --prod --audit-level high || true' }
        }
        stage('osv-scan') {
          steps {
            echo 'Recommend osv-scanner. Install and run: osv-scanner --lockfile=pnpm-lock.yaml'
          }
        }
      }
    }
  }

  post {
    always {
      cleanWs()
    }
  }
}
