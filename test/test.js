(() => {
  'use strict';

  const execa = require('execa');
  const fs    = require('fs-promise');
  const path  = require('path');

  const urls = ['https://example.com'];

  const exec_path     = path.resolve(__dirname, '../bin/response2json');

  describe(`Request some URLs and save the responses as JSON file`, () => {

    afterAll(() => {
      let response_file = path.resolve(__dirname, '../response.json'),
        temp_dir        = path.resolve(__dirname, '../temp_dir'),
        pretty_file     = path.resolve(__dirname, '../pretty.json');

      return Promise.all([
        fs.remove(response_file),
        fs.remove(temp_dir),
        fs.remove(pretty_file)
      ]);
    });

    test('without options', () => {
      let response_file = path.resolve(__dirname, '../response.json');

      return execa(exec_path, ['-u', urls[0]])
        .then(result => fs.exists(response_file))
        .then(exists => expect(exists).toBeTruthy())
        .catch(err => expect(err).toBeNull());
    });

    test('with "--output-file temp_dir/test.json"}', () => {
      let test_file = path.resolve(__dirname, '../temp_dir/test.json');

      return execa(exec_path, ['-u', urls[0], '-o', 'temp_dir/test.json'])
        .then(result => fs.exists(test_file))
        .then(exists => expect(exists).toBeTruthy())
        .catch(err => expect(err).toBeNull());
    });

    test('with "--output-file pretty.json --pretty-print"', () => {
      let pretty_file = path.resolve(__dirname, '../pretty.json');

      return execa(exec_path, ['-u', urls[0], '-o', 'pretty.json', '-p'])
        .then(result => fs.exists(pretty_file))
        .then(exists => expect(exists).toBeTruthy())
        .catch(err => expect(err).toBeNull());
    });
  });

})();
