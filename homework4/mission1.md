#USER TABLE
| userIdx | name | id | password |
|-------|------|----|----------|
|1|박현주|park|qwerty|


#ARTICLE TABLE
| articleIdx | author | title | content | likes |
|------------|--------|-------|---------|-------|
|1|홍길동|title|content|1|

#COMMENT TABLE
| articleIdx | comment |
|------------|---------|
|1|comment1|

#LIKE TABLE
| userIdx | articleIdx |
|---------|------------|
|1|1|