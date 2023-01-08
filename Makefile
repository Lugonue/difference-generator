install:
	npm ci
gen_diff:
	node bin/brain-games.js
publish:
	npm publish --dry-run
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
test_coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage --coverageProvider=v8
test_fix_lint:
	npx eslint --no-eslintrc --config .eslintrc.json --fix .
lint:
	npx eslint --no-eslintrc --config .eslintrc.json .