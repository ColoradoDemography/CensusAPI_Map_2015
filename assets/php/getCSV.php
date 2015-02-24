<?php
header("Content-type: application/octet-stream");
header("Content-Disposition: attachment; filename=\"my-data.csv\"");
$data=stripcslashes(strip_symbols($_REQUEST['csv_text']));
echo $data; 


//add this routine to strip the plusminus symbol

/**
 * Copyright (c) 2008, David R. Nadeau, NadeauSoftware.com.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *	* Redistributions of source code must retain the above copyright
 *	  notice, this list of conditions and the following disclaimer.
 *
 *	* Redistributions in binary form must reproduce the above
 *	  copyright notice, this list of conditions and the following
 *	  disclaimer in the documentation and/or other materials provided
 *	  with the distribution.
 *
 *	* Neither the names of David R. Nadeau or NadeauSoftware.com, nor
 *	  the names of its contributors may be used to endorse or promote
 *	  products derived from this software without specific prior
 *	  written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY
 * WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY
 * OF SUCH DAMAGE.
 */

/*
 * This is a BSD License approved by the Open Source Initiative (OSI).
 * See:  http://www.opensource.org/licenses/bsd-license.php
 */


/**
 * Strip symbol characters from UTF-8 text.
 *
 * Characters stripped from the text include characters in the following
 * Unicode categories:
 *
 * 	Modifier symbols
 * 	Private use symbols
 * 	Math symbols
 * 	Other symbols
 *
 * Exceptions are made for math symbols embedded within numbers (such as
 * + - /), math symbols used within URLs (such as = ~), units of measure
 * symbols, and ideograph parts.  Currency symbols are not removed.
 *
 * Parameters:
 * 	text		the UTF-8 text to strip
 *
 * Return values:
 * 	the stripped UTF-8 text.
 *
 * See also:
 *	http://nadeausoftware.com/articles/2007/09/php_tip_how_strip_symbol_characters_web_page
 */
function strip_symbols( $text )
{
	$plus   = '\+\x{FE62}\x{FF0B}\x{208A}\x{207A}';
	$minus  = '\x{2012}\x{208B}\x{207B}';

	$units  = '\\x{00B0}\x{2103}\x{2109}\\x{23CD}';
	$units .= '\\x{32CC}-\\x{32CE}';
	$units .= '\\x{3300}-\\x{3357}';
	$units .= '\\x{3371}-\\x{33DF}';
	$units .= '\\x{33FF}';

	$ideo   = '\\x{2E80}-\\x{2EF3}';
	$ideo  .= '\\x{2F00}-\\x{2FD5}';
	$ideo  .= '\\x{2FF0}-\\x{2FFB}';
	$ideo  .= '\\x{3037}-\\x{303F}';
	$ideo  .= '\\x{3190}-\\x{319F}';
	$ideo  .= '\\x{31C0}-\\x{31CF}';
	$ideo  .= '\\x{32C0}-\\x{32CB}';
	$ideo  .= '\\x{3358}-\\x{3370}';
	$ideo  .= '\\x{33E0}-\\x{33FE}';
	$ideo  .= '\\x{A490}-\\x{A4C6}';

	return preg_replace(
		array(
		// Remove modifier and private use symbols.
			'/[\p{Sk}\p{Co}]/u',
		// Remove math symbols except + - = ~ and fraction slash
			'/\p{Sm}(?<![' . $plus . $minus . '=~\x{2044}])/u',
		// Remove + - if space before, no number or currency after
			'/((?<= )|^)[' . $plus . $minus . ']+((?![\p{N}\p{Sc}])|$)/u',
		// Remove = if space before
			'/((?<= )|^)=+/u',
		// Remove + - = ~ if space after
			'/[' . $plus . $minus . '=~]+((?= )|$)/u',
		// Remove other symbols except units and ideograph parts
			'/\p{So}(?<![' . $units . $ideo . '])/u',
		// Remove consecutive white space
			'/ +/',
		),
		' ',
		$text );
}
?>