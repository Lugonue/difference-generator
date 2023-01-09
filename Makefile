install:
	npm ci
gen_diff:
	node bin/brain-games.js
publish:
	npm publish --dry-run
test:
	npx jest
test_coverage:
	npx jest --coverage 
test_fix_lint:
	npx eslint --no-eslintrc --config .eslintrc.json --fix .
lint:
	npx eslint --no-eslintrc --config .eslintrc.json .