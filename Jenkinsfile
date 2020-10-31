pipeline {
    agent any
    stages {
        stage('Build') {
            steps {  // window 使用 bat， linux 使用 sh
                bat 'npm i'
                bat 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                bat 'xcopy .\\build\\* D:\\node-server\\dist\\ /s/e/y' // 这里需要改成你的静态服务器资源目录
            }
        }
    }
}
