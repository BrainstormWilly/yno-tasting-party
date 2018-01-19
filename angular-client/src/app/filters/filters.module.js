import {LocalToUtcDateFilter} from './filters.local-to-utc-date';
import {UtcToLocalDateFilter} from './filters.utc-to-local-date';
import {UtcToLocalTimeFromNowFilter} from './filters.utc-to-local-time-from-now';
import {UtcToLocalTimeToNowFilter} from './filters.utc-to-local-time-to-now';

export const FiltersModule = angular
  .module('ynoTasting.filters', [])
  .filter('localToUtcDate', LocalToUtcDateFilter)
  .filter('utcToLocalDate', UtcToLocalDateFilter)
  .filter('utcToLocalTimeFromNowFilter', UtcToLocalTimeFromNowFilter)
  .filter('utcToLocalTimeToNowFilter', UtcToLocalTimeToNowFilter)
  .name;
