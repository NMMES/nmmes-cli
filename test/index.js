import {
    Runners,
    Reporters
} from 'universalis-tester';
import * as suites from './specs';
let spec = new Reporters.Spec(new Runners.Default(suites));

spec.start();
